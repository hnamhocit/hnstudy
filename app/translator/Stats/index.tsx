import StatsCard from "./StatsCard"

const Stats = () => {
  return (
    <div className="grid grid-cols-4 gap-4">

      <StatsCard color="blue" />
      <StatsCard color="green" />
      <StatsCard color="purple" />
      <StatsCard color="orange" />

    </div>
  )
}

export default Stats 
