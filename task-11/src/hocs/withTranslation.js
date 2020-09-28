import ua from '../languages/ua';
import en from '../languages/en';
import React, {Component} from "react";

export const withTranslation = (View) => {
    const lang = window.localStorage.getItem('lang');
    const translation = lang === 'ua'? ua : en;
    console.log(translation, lang);

    return class extends Component {
        render() {
            return (
                <View {...this.props} labels={translation}/>
            )
        }
    }
};
