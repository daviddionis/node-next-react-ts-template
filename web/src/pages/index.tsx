import { NextPage, NextPageContext } from "next";
import Link from "next/link";


const IndexPage: NextPage = () => {
    return (
        <div>
            <Link href="/login?r=/users">Go To Login</Link>
        </div>
    )
}

// IndexPage.getInitialProps = async (ctx: NextPageContext) => {
//     return { ctx };
// }

export default IndexPage;