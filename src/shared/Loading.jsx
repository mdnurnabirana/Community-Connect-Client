import Container from "./Container";
import { Puff } from "react-loader-spinner";

const Loading = ({ height = 80, width = 80 }) => {
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Puff
          visible={true}
          height={height}
          width={width}
          color="#0D9488"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </Container>
  );
};

export default Loading;
