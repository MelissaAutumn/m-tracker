import {IPlayer} from "../../../types/IPlayer";
import {IMetadata} from "../../../types/IMetadata";

interface IModPlayerMetadataProps {
  player : IPlayer
}

const Metadata = (props:IModPlayerMetadataProps) => {
  const player = props.player;

  if (!player) {
    return (<div/>);
  }

  const metadata = player.metadata() as IMetadata;

  const formattedMetadata: any[] = [];
  Object.keys(metadata).forEach(function(key) {
    // Format message
    if (key === 'message') {
      formattedMetadata.push(<li key={key}><b>{key}</b>: <pre>{metadata[key]}</pre></li>);
      return;
    }

    // @ts-ignore
    formattedMetadata.push(<li key={key}><b>{key}</b>: {metadata[key]}</li>);
  });

  return (
    <div>
      {formattedMetadata}
    </div>
  )
}

export default Metadata;