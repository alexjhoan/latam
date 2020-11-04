import { Button } from "antd"
import {ArrowLeftOutlined} from '@ant-design/icons'

export const LandingHeader = () => {
    
    const genHomeLink = () => window.location.hostname == 'latam.infocasas.com.py' 
        ? 'https://www.infocasas.com.py?h'
        : 'https://www.infocasas.com.uy?h'

    return (<>
    <header>
        <a href={genHomeLink()}>
            <img src="/images/logos/IC.webp" alt="InfoCasas" height="24"/>
        </a>

        <Button type="link" href={genHomeLink()}>
            <ArrowLeftOutlined />
            Estás en el evento LatAm Invierte. Volver a la home
        </Button>

    </header>
    <style jsx>{`
        header{
            overflow: hidden;
            z-index: 50;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 64px;
            padding: 0 16px;
            color: #3A4145;
            line-height: 64px;
            background: #fff;
            display: flex;
            flex-direction: row;
            justify-content:space-between;
            align-items:center;
        }
        
    `}</style>
    </>)
} 


