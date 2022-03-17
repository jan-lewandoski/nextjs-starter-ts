import Layout from '@components/Layout/Layout'

//eslint-disable-next-line
const WithLayout = (Component: React.ElementType) => (props: any) => {
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  )
}

export default WithLayout
