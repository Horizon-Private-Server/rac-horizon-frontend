import React from "react";

interface RedirectProps {
    url: string;
}

const Redirect = (props: RedirectProps) => {
    window.location.replace(props.url);
    return <></>
}

export default Redirect;
