import { AppLayout } from "../AppLayout/AppLayout";
import "./EosApp.css";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

function EosApp() {
	return (
		<AppLayout>
			<AppLayout.Footer>
				{["meds", "protocols", "cpr"].map((panel) => (
					<AppLayout.FooterItem icon={faDatabase} key={panel} onClick={() => {}}>
						{panel === "meds"
							? "תרופות"
							: panel === "protocols"
							? "פרוטוקולי חירום"
							: "החייאה"}
					</AppLayout.FooterItem>
				))}
			</AppLayout.Footer>
		</AppLayout>
	);
}

export default EosApp;
