import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { getAllPostIds, getPostData } from "../../lib/posts"
import homeStyles from '../../styles/home.module.css'

export default function Post({postData}:{
    postData:{
        title: string
        date: string
        contentHtml: string
    }}) {
    return(
        <div>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={homeStyles.headingXl}>{postData.title}</h1>
                <div className={homeStyles.lightText}>
                    {postData.date}
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </div>
    )
}

export const getStaticPaths : GetStaticPaths = async () => {
    //동적 라우팅 파일을 사용할때 (ex.[id].tsx) getStaticPaths : GetStaticPaths = () =>{} 이러한 형식의 함수를 사용한다.
    const paths = getAllPostIds()
    console.log('paths', paths)
    
    return{
        /*paths: [
            [{params: { id: 'pre-rendering' }}, 
            { params: {id : 'ssg-ssr'}}
            ], 
            fallback
        */
        paths,
        fallback: false
        //false면 getStaticPaths로 리턴되지 않는 것은 모두 404 페이지가 뜬다
        //true 면 404로 뜨지 않고, fallback 페이지가 뜨게 된다.
    }
}

export const getStaticProps : GetStaticProps = async ({ params }) => {
    console.log('params', params );
    //{ id: 'ssg-ssr'}
    const postData = await getPostData(params?.id as string)//params && id

    return{
        props: {
            postData
        }
    }
}
