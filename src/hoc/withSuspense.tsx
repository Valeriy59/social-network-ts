import React from "react";


// export const WithSuspense: React.FC = ({children}) => {
//     return <>{children}</>
//         {/*<React.Suspense fallback={<div>Loading...</div>}>*/}
//
//         {/*</React.Suspense>*/}
//
//
// }

type PropsType = {
    children: JSX.Element | JSX.Element[];
}

export const WithSuspense = (props:PropsType) => {
    return <React.Suspense fallback={<div>Loading...</div>}>
        {props.children}
    </React.Suspense>

}