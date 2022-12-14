import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import homeStyles from '../styles/Home.module.css'
import { getSortedPostsData } from '../lib/posts';

const Home = ({allPostsData}:{
  allPostsData:{
    date:string
    title:string
    id:string
  }[]
}) => {
  console.log('allPostsData', allPostsData);
  return (
    <div>
      <Head>
        <title>Your Name</title>
      </Head>
      <section>
        <p>[Your Self Introductuin]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list} >
          {allPostsData.map(({id, date, title}) =>(
            <li className={homeStyles.listItem} key={id}>
              <Link href={`/post/${id}`}>
                <span>{title}</span>
              </Link>
              <br />
              <small className={homeStyles.lightText}>
                {date}  
              </small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Home

//useEffect같이 불러오는 함수 시점지정
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return{
    props: {
      allPostsData //id,date,title
    }
  }
}