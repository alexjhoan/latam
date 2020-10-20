import { TrackEventGA } from "../lib/_toBeDeleted_GoogleAnalytics.js";
import Console from "../lib/console";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { handleApolloError } from "../lib/apollo";

const IS_BROWSER = typeof window !== "undefined";

const ONE_SIGNAL_ID_QUERY = gql`
	query OS_ID {
		configuration {
			onesignal_configuration {
				app_id
			}
		}
	}
`;

const ME_QUERY = gql`
	query ME_ONE_SIGNAL {
		me {
			id
			name
			email
			country_id
			type
		}
	}
`;
var OneSignal;
export function OneSignalComponent() {
	const { data: dataMe, loading: loadingMe } = useQuery(ME_QUERY, {
		errorPolicy: "ignore",
	});
	const { data, loading, error } = useQuery(ONE_SIGNAL_ID_QUERY);

	if (error) {
		if (handleApolloError(error)) return null;
	}
	if (IS_BROWSER && !error && !loading && !loadingMe && !window.OneSignal_INITIALIZED) {
		OneSignal = window.OneSignal || [];

		OneSignal.push(() => {
			OneSignal.init({
				appId: data.configuration.onesignal_configuration.app_id,
				allowLocalhostAsSecureOrigin: true,
				autoRegister: true,
				notifyButton: {
					enable: false,
				},
				promptOptions: {
					actionMessage: "Nos gustaría enviarte notificaciones de las últimas novedades!",
					acceptButtonText: "Aceptar",
					cancelButtonText: "No gracias",
				},
				welcomeNotification: {
					disable: true,
					title: "Infocasas",
					message: "Gracias por suscribirte!",
				},
			}).catch(e => {
				Console.warn("No se pudo initializar OneSignal");
				Console.log(e);
			});
		});

		OneSignal.push(() => {
			//guardar que accion tomó el usuario con prompt nativo de permisos del browser
			OneSignal.on("notificationPermissionChange", function(permissionChange) {
				var currentPermission = permissionChange.to;
				TrackEventGA({
					action: "WebPushNotifications",
					category: "permissionChange",
					label: currentPermission,
				});
			});
		});

		OneSignal.push(() => {
			//trackeo cuando muestro prompt nativo del browser
			OneSignal.on("permissionPromptDisplay", function(event) {
				TrackEventGA({
					action: "WebPushNotifications",
					category: "showNativePromptPermission",
				});
			});
		});

		// state check
		if (dataMe != null && dataMe.me != null) {
			OneSignal.push(function() {
				OneSignal.isPushNotificationsEnabled(function(isEnabled) {
					if (isEnabled) {
						OneSignal.push(function() {
							//OneSignal.setEmail(midConfig.logged_email);
							OneSignal.sendTags({
								ic_user_id: dataMe.me.id,
								nombreContacto: dataMe.me.name,
								ic_email: dataMe.me.email,
								ic_id_pais: dataMe.me.country_id,
								particular: dataMe.me.type,
							});
						});
					}
				});
			});
		}

		window.OneSignal_INITIALIZED = true;
	}

	return <React.Fragment />;
}
