import React from "react";
import {Helmet} from 'react-helmet'
import Logo from "resources/images/official_logo_white_bg.png"
import {OG_TYPE,SEO_DEFAULT_IMG} from "../../constants/contants";
import PropTypes from 'prop-types';

const SeoTags = ({companyName, title, description, img, path, type}) => {

    const imgUrl = img ? img : SEO_DEFAULT_IMG;
    const contentType = type in OG_TYPE ? type : OG_TYPE.website;
    const url = `http://www.aaronmalki.com${path}`;

    let meta = [
        {
            property: `og:image`,
            content: imgUrl,
        },
        {
            property: `twitter:image`,
            content: imgUrl,
        },
        {
            property: `og:url`,
            content: url,
        },
        {
            name: `description`,
            content: description,
        },
        {
            property: `og:title`,
            content: title,
        },
        {
            property: `og:description`,
            content: description,
        },
        {
            property: `og:type`,
            content: contentType ? contentType : `website`,
        },
        {
            name: `twitter:creator`,
            content: companyName,
        },
        {
            name: `twitter:title`,
            content: title,
        },
        {
            name: `twitter:description`,
            content: description,
        },
    ];


    return <Helmet>
        <html lang="en"/>
        <title>{title}</title>
        <meta property={'og:image'} content={imgUrl}/>
        <link rel={"canonical"} href={url}/>
        <meta content={companyName} property="og:site_name"/>
        {meta.map((obj,index) => {
            return <meta {...obj} key={index}/>
        })}
    </Helmet>
};


SeoTags.propTypes = {
    companyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    img: PropTypes.string,
    type: PropTypes.oneOf([OG_TYPE.website, OG_TYPE.article, OG_TYPE.blog]),
};
export default SeoTags