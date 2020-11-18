import React from "react";
import {Helmet} from 'react-helmet'
import Logo from "resources/images/official_logo_white_bg.png"
import {OG_TYPE} from "../../constants/contants";
import PropTypes from 'prop-types';

const RenderMeta = ({title, description, companyName, type, img, url}) => {


    let meta = [
        {
            property: `og:image`,
            content: img,
        },
        {
            property: `twitter:image`,
            content: img,
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
            content: type ? type : `website`,
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
    return <React.Fragment>
        {meta.map((obj) => {
            return <meta {...obj} key={'property' in obj ? obj['property'] : obj['name']}/>
        })}
    </React.Fragment>
};

const SeoTags = ({companyName, title, description, img, path, type}) => {

    const imgUrl = img ? img : "%PUBLIC_URL%/official_logo_transparent.png";
    const contentType = type in OG_TYPE ? type : OG_TYPE.website;
    const url = `http://www.aaronmalki.com${path}`;

    return <Helmet>
        <html lang="en"/>
        <title>{title}</title>
        <meta property={'og:image'} content={imgUrl}/>
        <link rel={"canonical"} href={url}/>
        <meta content={companyName} property="og:site_name"/>
        <RenderMeta description={description}
                    title={title}
                    type={contentType}
                    img={imgUrl}
                    companyName={companyName}
                    url={url}/>
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