import fontTruliaStyles from "./TruliaFont";
import iconsStyles from "./infocasas";
import sliderStyles from "./carousel/slick-carousel";
import resetStyles from "./reset";
import IC2globalStyles from "./global";

export function GlobalStyles() {
	const stylesList = [
		resetStyles,
		fontTruliaStyles,
		IC2globalStyles,
		iconsStyles,
	];

	return (
		<React.Fragment>
			{stylesList.map((e, i) => {
				return (
					<React.Fragment key={"global_style_" + i}>
						<style jsx global>
							{e}
						</style>
					</React.Fragment>
				);
			})}
		</React.Fragment>
	);
}
