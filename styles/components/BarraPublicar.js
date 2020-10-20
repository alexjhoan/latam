// Estilos Footer
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
	.publicarAqui{
		width: 100%;
	    height: auto;
	    padding-top: 2px;
	    background-color: #ff7043;
	    color: #fff;
	    overflow: hidden;
	    margin-bottom: 2px;
	}
	.publicarAquiIn {
	    width: 100%;
	    max-width: 600px;
	    margin: 0 auto;
	    display: flex;
	    justify-content: space-between;
	    flex-wrap: nowrap;
	    align-items: center;
	}
	.publicarAquiIn :global(img) {
	    width: 100%;
	    max-width: 111px;
	    float: left;
	    height: auto;
	    padding-top: 10px;
	}
	.publicaLeft {
	    align-items: center;
	    display: flex;
	    justify-content: space-between;
	    flex-basis: calc(100% - 130px);
	}
	.publicarAqui .textPublicar {
	    color: #fff;
	    font-size: 22px;
	    text-align: left;
	    line-height: 28px;
	}
	.publicarAqui .textPublicar .title {
	    font-size: 25px;
	    font-weight: bold;
	    display: block;
	}
	.publicarAqui a{
		text-decoration: none;
	}
	.publicarAqui .verMasInfoPublicar {
	    color: #fff;
	    border: 1px solid #fff;
	    padding: 14.8px 18px;
	    border-radius: 5px;
	    text-decoration: none;
	    font-size: 14px;
   		font-weight: 300;
	}
	.publicarAqui .verMasInfoPublicar:hover{
		background-color: white;
		color: #ff7043;
		font-weight: 400;
	}

	@media screen and (max-width: 768px){
		.publicarAquiIn {
		    width: 100%;
		    justify-content: center;
		}
		.publicarAquiIn :global(img) {
			margin-right: 15px;
		}
		.publicarAqui .textPublicar {
		    flex-basis: 58%;
		    padding-left: 0px;
		    font-size: 16px;
    		padding-top: 5px;
    		line-height: 22px;
		}
		.publicarAqui .textPublicar .title {
    		font-size: 18px;
    	}
    	.publicaLeft {
			flex-direction: column;
		    justify-content: flex-start;
		    align-items: flex-start;
	   		flex-basis: auto;
		}
		.publicarAqui a{
			padding-top: 10px;
		}
		.publicarAqui .verMasInfoPublicar {
		    padding: 10px 18px;
		}
	}
	@media screen and (max-width: 370px){
		.publicarAquiIn {
			align-items: flex-end;
		}
		.publicaLeft {
			padding 5px 0px;
		}
		.publicarAqui .textPublicar {
			text-align: center;
		}
		.publicarAqui a{
			margin: 0 auto;
		}
	}
`;
