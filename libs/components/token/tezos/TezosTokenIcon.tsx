// @ts-ignore
import defaultIcon from '../default.png';

type Props = {
  url: string;
};

const TezosTokenIcon = (props: Props) => {
  return (
    <img
      style={{ width: 28, height: 28, marginRight: 5, verticalAlign: 'middle' }}
      src={`https://cloudflare-ipfs.com/ipfs/${
        props.url ? props.url.replace('ipfs://', '') : ''
      }`}
      alt={''}
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = defaultIcon;
      }}
    />
  );
};
export default TezosTokenIcon;
