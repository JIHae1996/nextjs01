import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(),'posts')
// process.cwd = Node.js의 기본경로 = 지금 현재 경로 = 각각의 파일 위에 posts 경로를 추가하기 위해 만들었다. 
//console.log('postsDirectory',postsDirectory);

export function getSortedPostsData(){
    const fileNames = fs.readdirSync(postsDirectory);
    //동기식Sync, 비동기식
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/|.md$/, '');//pre-rendering
        const fullPath = path.join(postsDirectory, fileName);
        //C:|projects|app_nextjs_typrscript/posts/pre-rendering.md
        const fileContents = fs.readFileSync(fullPath, 'utf8');//파일 내용
        const matterResult = matter(fileContents);

        return {
            id,
            ...(matterResult.data as {date:string; tilte:string})
        }
    })

    return allPostsData.sort((a,b) => {
        if(a.date < b.date){
            return 1
        } else {
            return -1
        }
    })

}
// 정렬 되어져있는 포스트 데이터를 가져온다

export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/|.md$/, '')
            }
        }
    })
}
// 모든 포스트의 아이디를 가져온다

export async function getPostData(id:string){
    const fullPath = path.join(postsDirectory, `${id}.md`);
    //C:|projects|app_nextjs_typescript/posts/pre-rendering.md
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark() //remark는 markdown을 html로 변환
                                    .use(html)
                                    .process(matterResult.content)
    const contentHtml = processedContent.toString();
    return {
        id,
        contentHtml,
        ...(matterResult.data as {date:string; title:string;})
    }
}
// 포스트 데이터를 가져온다