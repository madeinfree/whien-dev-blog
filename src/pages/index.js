import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { withPrefix } from "gatsby"

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
        <h3>{`My Home Cat 🐱`}</h3>
        <img
          style={{ borderRadius: 3 }}
          src={withPrefix("/img/tata.jpg")}
          alt="tata-mycat"
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                <h3
                  style={{
                    marginTop: 20,
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  {title}
                </h3>
                {node.frontmatter.featuredImage ? (
                  <Img
                    style={{ borderRadius: 3 }}
                    sizes={node.frontmatter.featuredImage.childImageSharp.sizes}
                  />
                ) : null}
              </Link>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
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
