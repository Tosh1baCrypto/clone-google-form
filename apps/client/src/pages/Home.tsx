import Blank from "../components/Blank"
import Header from "../components/HeaderHome"
import Template from "../components/Template"
import { useEffect } from 'react'
import { useGetFormsQuery } from '../generated/graphql'


const Home = () => {
  const { refetch } = useGetFormsQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

	return (
		<div>
      <Header/>
			<Template />
      <Blank />
		</div>
	)
}

export default Home
