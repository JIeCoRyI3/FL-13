import ua from '../locales/ua';
import en from '../locales/en';
import React from "react";

export const withTranslation = (WrappedComponent) => {
    const locale = window.localStorage.getItem('lang');
    const translation = locale === 'ua'? ua : en;

    return function(props) {
        return (
            <WrappedComponent {...props} labels={translation}/>
        )
    }
};
