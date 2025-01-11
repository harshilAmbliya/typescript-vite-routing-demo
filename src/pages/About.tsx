import { Link } from "react-router-dom"

type Props = {}

const About = (props: Props) => {
  return (
    <div>
        <p>About</p>
        <Link to="/">Home</Link>
    </div>
  )
}

export default About