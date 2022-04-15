import { Input } from '@components/atomic-design/atoms/Input/Input'
import Layout from '@components/Layout/Layout'
import classNames from 'classnames'

const Home = () => {
  const className = undefined
  return (
    <Layout>
      <div className="p-8">
        <Input id="xaxa" label="Xaxa" name="xaxa" />
        <h1 className={classNames(className, 'text-xl text-green-500', { 'font-bold': true })}>
          Home page
        </h1>
        <p className="text-lg">This is a home page</p>
      </div>
    </Layout>
  )
}

export default Home
