import Link from "next/link";

export default function SuggestInputBusquedaTextSuggest(props) {
  return (
    <div className="suggest">
      <div className="sugest-container">
        <div className="textSuggest">
          <span>{props.text}</span>
        </div>
      </div>
    </div>
  );
}
