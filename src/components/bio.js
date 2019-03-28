import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

function SocialLink({ link, children }) {
  return (
    <a
      style={{
        color: `#757575`,
      }}
      href={link}
      target={`_blank`}
    >
      {children}
    </a>
  )
}

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              alignItems: `center`,
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <div>
              嗨，我是懷恩，專注於 JavaScript 多年的開發者，
              <SocialLink link={`https://jioukou.yosgo.com/`}>
                目前在 YOSGO 擔任開發領導
              </SocialLink>
              ，空閒時也會舉辦一些 Workshop 分享實體活動，您可以透過{` `}
              <SocialLink link={social.facebook}>Facebook</SocialLink>,{` `}
              <SocialLink link={social.github}>Github</SocialLink> 或{` `}
              <SocialLink link={`mailto:sal95610@gmail.com`}>寫信</SocialLink>
              {` `}
              與我聯繫。
            </div>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          facebook
          github
          email
        }
      }
    }
  }
`

export default Bio
