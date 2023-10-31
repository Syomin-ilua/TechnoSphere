import "./Container.css";

const Container = (props) => {

    const componentClass = props.class;

    return (
        <div className={`container ${componentClass ? componentClass : ''}`}>
            {props.children}
        </div>
    );
};

export default Container;