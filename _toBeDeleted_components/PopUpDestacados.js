import PopUp from "./PopUp.js";
import { TrackEventGA } from "../lib/_toBeDeleted_GoogleAnalytics.js";
import { useQuery } from "react-apollo";
import { gql } from "@apollo/client";
import { handleApolloError } from "../lib/apollo";
import ImagenOptimizada from "./ImagenOptimizada";

export const COMPONENT_POPUP_DESTACADOS_ID = "popupDestacado";
export const COMPONENT_POPUP_DESTACADOS_ID_VOID = "popupDestacado_void";

let show = false;
if (
	typeof localStorage !== "undefined" &&
	(localStorage.getItem("popup_destacado") == null ||
		Date.now() - localStorage.getItem("popup_destacado") >= 1 * 24 * 60 * 60 * 1000)
) {
	show = true;
}

const POPUPS_QUERY = gql`
	query Popup {
		featuredPopup {
			id
			title
			url
			image
			mobile_image
			video
			video_thumbnail
			html
		}
	}
`;

// this is important for testing purposes,
const NoPopup = <div id={COMPONENT_POPUP_DESTACADOS_ID_VOID} />;

function PopUpDestacados(props) {
	if (!show) return NoPopup;
	const { data, loading, error } = useQuery(POPUPS_QUERY);
	if (error) {
		if (handleApolloError(error)) return NoPopup;
	}
	if (loading) return null; //dont return nopoup, because i don't know yet if there will or will not be one
	if (data.featuredPopup == null) return NoPopup;
	let popup = data.featuredPopup;


	localStorage.setItem("popup_destacado", Date.now());

	TrackEventGA({
		category: "POPUP",
		action: "mostrar",
		label: typeof popup != "undefined" ? popup.title : "",
	});

	if (popup.video != null || popup.image) {
		if (popup.video != null) {
			popup["video_ext"] = popup["video"]
				.split(/\#|\?/)[0]
				.split(".")
				.pop()
				.trim();
		}

		return (
			<PopUp
				settings={{
					closer: "cerrar_popup",
					stopBodyScroll: true,
				}}>
				<div id={COMPONENT_POPUP_DESTACADOS_ID} className="popContenedor cvtp">
					<div className="content">
						<div className="cerrar_popup">
							<i className="icon-cancel"></i>
						</div>
						<a target="_blank" href={popup.url} className="link">
							{popup.video != null ? (
								<video autoPlay loop muted poster={popup.video_thumbnail}>
									<source src={popup.video} type={"video/" + popup.video_ext} />
								</video>
							) : (
								<picture>
									{popup.mobile_image != null ? (
										<source
											media="(max-width: 980px)"
											srcSet={popup.mobile_image}
										/>
									) : null}
									<ImagenOptimizada src={popup.image} alt={popup.title} />
								</picture>
							)}
						</a>
					</div>
				</div>
			</PopUp>
		);
	}

	/* si es html hay que hacer componente en react :|  */

	return NoPopup;
}
export default PopUpDestacados;
