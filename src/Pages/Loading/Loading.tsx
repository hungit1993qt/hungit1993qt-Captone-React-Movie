import React from 'react'
import LoadingStyles from 'Playground/SCSS/Loading.module.scss'

type Props = {}

const Loading = (props: Props) => {
    return (
        <div>
            <div className={LoadingStyles["loader"]} />
        </div>

    )
}

export default Loading