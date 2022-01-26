import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,BarChart,Bar,PieChart,Pie,Cell } from 'recharts';
import {connect} from "react-redux";
import {
    amountOfMatchesWonByPlayer,
    getAllMatches,
    amountOfMatchesByPlayer,
    surfacesPlayed
} from "../../ducks/matches/selectors";
import {getAllPlayers} from "../../ducks/players/selectors";
import {getAllObjects} from "../../ducks/objects/selectors";




const Stats = ({amountOfMatchesByPlayer,amountOfMatchesWonByPlayer,surfacesPlayed}) => {

    console.log(amountOfMatchesByPlayer)
    return (
        <div className="stats-main">
            <div className="stats-section one">
                <div className="stats-title">
                    <h3>Players with the most matches played</h3>
                </div>
                <div className="stats-chart">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            width="100%"
                            height={300}
                            data={amountOfMatchesByPlayer}
                            margin={{
                                top: 15,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="stats-section two">
                <div className="stats-title">
                    <h3>Players with the most matches won</h3>
                </div>
                <div className="stats-chart">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            width="100%"
                            height={300}
                            data={amountOfMatchesWonByPlayer}
                            margin={{
                                top: 15,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="stats-section three">
                <div className="stats-title">
                    <h3>Surfaces with amount of matches played</h3>
                </div>
                <div className="stats-chart">
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart width={400} height={400}>
                            <Pie data={surfacesPlayed} isAnimationActive={false} dataKey="amount" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
                                <Cell fill="purple" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>

                    </ResponsiveContainer>
                </div>
            </div>

        </div>


    );
};

const mapStateToProps = (state) => {
    return {
        amountOfMatchesByPlayer: amountOfMatchesByPlayer(state),
        amountOfMatchesWonByPlayer: amountOfMatchesWonByPlayer(state),
        surfacesPlayed: surfacesPlayed(state)
    };
}
export default connect(mapStateToProps, null)(Stats);