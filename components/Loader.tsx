interface LoaderProps {
    message: string;
    error: boolean;
}

const Loader: React.FC<LoaderProps> = ({ message, error }) => {
    return (error ?
        <h2 style={{padding: '15px'}}>&#128308; { message }</h2>
        :
        <h2 style={{padding: '15px'}}>{ message }</h2>
    );
};

export default Loader;