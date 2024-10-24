import {Outlet, Link} from "react-router-dom";

const routesList = [
    {
        path: '/about',
        name: 'About',
    },
    {
        path: '/index1',
        name: 'Index1',
    },
    {
        path: '/index2',
        name: 'Index2--数据集--dataset',
    },
    {
        path: '/index3',
        name: 'Index3--事件与行为--event',
    },
    {
        path: '/index4',
        name: 'Index4--动态排序柱状图',
    },
    {
        path: '/index5',
        name: 'Index5--游标--cursor',
    },
]
export default function Root() {
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <nav>
                    <ul>
                        {
                            routesList.map((route) => {
                                return <li key={route.path}>
                                    <Link to={route.path}>{route.name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet/>
            </div>
        </>
    );
}
