import Layout from '@components/Layout/Layout'
import classNames from 'classnames'

const Home = () => {
  const className = undefined
  return (
    <Layout>
      <div className="p-8">
        <button className="bg-danger-500">Click me!</button>
        <h1 className={classNames(className, 'text-xl text-green-500', { 'font-bold': true })}>
          Home page
        </h1>
        <p className="text-lg">This is a home page</p>
      </div>
    </Layout>
  )
}

export default Home
