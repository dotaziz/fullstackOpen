import StatisticsLine from "./stats-line"

const Statistics = ({good, neutral, bad}) => {
    let all = good + neutral + bad
    let positive = (good/all) * 100
    let average = (good - bad) / all
    if(all === 0){
        return(
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }else{
        return(
            <div>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <StatisticsLine text="good" value={good} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <StatisticsLine text="neutral" value={neutral} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <StatisticsLine text="bad" value={bad} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <StatisticsLine text="All" value={all} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <StatisticsLine text="average" value={average} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <StatisticsLine text="Positive" value={positive.toString() + "%"} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Statistics