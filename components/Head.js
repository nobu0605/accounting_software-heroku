import Head from 'next/head'

export default class HeadTag extends React.Component {
    render() {
        return (
            <Head>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="static/css/main.css"
                />
                <link rel="SHORTCUT ICON" href="static/img/pie.png" />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="//fonts.googleapis.com/css?family=Pacifico"
                />
                <title key="title">Accounting</title>
            </Head>
        )
    }
}
