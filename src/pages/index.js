import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`, `whien`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              {node.frontmatter.featuredImage ? (
                <Img
                  sizes={node.frontmatter.featuredImage.childImageSharp.sizes}
                />
              ) : null}
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
        <a
          href={`https://www.buymeacoffee.com/OqAoBMY`}
          target={`_blank`}
          rel={`noopener noreferrer`}
          style={{
            boxShadow: `none`,
          }}
        >
          <img
            src={`https://www.buymeacoffee.com/assets/img/custom_images/black_img.png`}
            alt={`斗內一杯咖啡`}
            style={{
              marginBottom: 0,
              height: `auto !important`,
              width: `auto !important`,
            }}
          />
        </a>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            featuredImage {
              publicURL
              childImageSharp {
                sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`
