import React from "react";
import { useTheme } from "../shared-components/Styles/ThemeHook";
import { DownOutlined } from '@ant-design/icons';

// ant design components
import {Row, Col, Menu, Dropdown, Affix, Divider} from "antd";
import { Typography, Space } from 'antd';
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function NavBar() {
	const { theme } = useTheme();
	const { Title, Text } = Typography;
	const screen = useBreakpoint();

	const clickFalse = (e) => {
		e.preventDefault()
	}

	const menu = (
	  <Menu className="navBar">
	    <Menu.Item key="0">
	      <a href="/#" onClick={clickFalse} className="navLink">
	      	<div className="imgContainer">
	      		<img src="/images/icons/OpenDay.png" alt="." />
	      	</div>	
	      	Open Day Virtual
	      </a>
	    </Menu.Item>
	    <Divider type={!screen.lg ? "horizontal" : "vertical"}/>
	    <Menu.Item key="1">
	      <a href="/#" onClick={clickFalse} className="navLink">
	      	<div className="imgContainer">
	      		<img src="/images/icons/Charlas.png" alt="." />
	      	</div>	
	      	Charlas
	      </a>
	    </Menu.Item>
	    <Divider type={!screen.lg ? "horizontal" : "vertical"}/>
	    <Menu.Item key="2">
	    	<a href="/#" onClick={clickFalse} className="navLink">
	    		<div className="imgContainer">
	      		<img src="/images/icons/OpenDay.png" alt="." />
	    		</div>	
	      	Sala en Vivo
	      </a>
	    </Menu.Item>
	    <Divider type={!screen.lg ? "horizontal" : "vertical"}/>
	    <Menu.Item key="3">
	    	<a href="/#" onClick={clickFalse} className="navLink">
	    		<div className="imgContainer">
	      		<img src="/images/icons/Propiedades.png" alt="." />
	    		</div>	
	      	Propiedades
	      </a>
	    </Menu.Item>
	    <Divider type={!screen.lg ? "horizontal" : "vertical"}/>
	    <Menu.Item key="4">
	    	<a href="/#" onClick={clickFalse} className="navLink">
	    		<div className="imgContainer">
	      		<img src="/images/icons/Directorio.png" alt="." />
	    		</div>	
	      	Directorio
	      </a>
	    </Menu.Item>
	    <Divider type={!screen.lg ? "horizontal" : "vertical"}/>
	    <Menu.Item key="5">
	    	<a href="/#" onClick={clickFalse} className="navLink">
	    		<div className="imgContainer">
	      		<img src="/images/icons/BigData.png" alt="." />
	    		</div>	
	      	Big Data
	      </a>
	    </Menu.Item>
	  </Menu>
	);

	return (
		<Affix offsetTop={64} className="navBarLanding">
			<Row
				align={"middle"}
				justify={"center"}
				>
				<Col xs={24}>
				{!screen.lg ? (
					<Dropdown overlay={menu} trigger={['click']} className="dropDownNavBar">
				    <a className="ant-dropdown-link dropDownLink" onClick={e => e.preventDefault()}>
				      ¡Hola! ¿Qué estás buscando? <DownOutlined />
				    </a>
				  </Dropdown>
				  ): menu}
				</Col>
			</Row>
			<style jsx global>{`
				.navBarLanding .navBar {
					display:flex;
					flex-direction: ${!screen.lg ? "column" : "row" };
					align-items: center;
					justify-content: center;
					height: 64px;
  				border-right: none;
  				background: #fff;
				}
				.navBarLanding .navBar {
					border-top: solid 1px #0000000f;
    			box-shadow: 0px 0px 15px #0000009f;
				}
				.navBarLanding .dropDownNavBar, .ant-dropdown-menu-item, .ant-dropdown-menu-item .navLink {
					display: flex;
			    flex-direction: row;
			    justify-content: center;
			    align-items: center;
				}
				.navBarLanding .navLink .imgContainer {
					display: contents;
				}
				.navBarLanding .navLink img, .ant-dropdown .navLink img{
					width: auto;
					height: 30px;
					margin-right: 5px;
				}
				.navBarLanding .ant-divider-vertical {
			    height: 80%;
				}
				.ant-dropdown-menu{
					padding: 15px 0;
				}
				.ant-dropdown .ant-divider-horizontal  {
			    min-width: 90%;
			    width: 90%;
    			margin: 10px auto;
				}
				.ant-dropdown-menu-item .navLink {
					width: 200px;
    			justify-content: flex-start;
				}
				.ant-dropdown-menu-item .navLink .imgContainer {
				  width: 50px;
				}
				.dropDownLink, .dropDownLink:hover, .dropDownLink:active, .dropDownLink:focus {
					height: 64px;
    			border-bottom: solid 2px ${theme.colors.primaryColor};
    			font-size: 1.1rem;
    			font-weight: 700;
    			border-top: solid 1px #3A4145;
    			color: ${theme.colors.textColor};
    			transition: 0.3s ease-in-out;
    			background: #fff;
				}
				.dropDownLink.ant-dropdown-open {
					color: ${theme.colors.primaryColor};
    			transition: 0.3s ease-in-out;
				}
				.dropDownLink span{
    			color: ${theme.colors.textColor};
					font-size: 18px!important;
    			margin-left: 10px;
    			transition: 0.3s ease-in-out;
				}
				.dropDownLink.ant-dropdown-open span{
					color: ${theme.colors.primaryColor};
					transform: rotate(180deg);
    			transition: 0.3s ease-in-out;
				}
			`}</style>
		</Affix>
	);
}
