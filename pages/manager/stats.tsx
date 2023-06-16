import Loader from "@/components/Loader";
import { StatsMessage } from "@/errors/stats-errors";
import { baseServerPath } from "@/helpers/paths";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import ManagerLayout from "@/layouts/ManagerLayout";
import { statsSlice } from "@/store/reducers/StatsSlice";
import { Chart as ChartJS, defaults, CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import statsCSSVariables from "../../styles/pages/manager-stats.module.scss";

enum StatListHeader {
    ALL = 'Всего:',
    SUCCESS = 'Успешно решено (всего):',
    AT_WORK = 'В работе (всего):',
    FAILED = 'Провалено (всего):',
    AVERAGE_EXEC_TIME = 'Среднее время решения:'
}

enum StatChartHeader {
    SUCCESS = 'успешные (%)',
    FAILED = 'проваленные (%)',
    AT_WORK = 'в работе (%)'
}

const Stats = () => {
    const { setStatsStatsSuccess, setStatsError } = statsSlice.actions;
    const { token } = useTypedSelector(state => state.authReducer);
    const { requestStats, error } = useTypedSelector(state => state.statsReducer);
    const dispatch = useTypedDispatch();

    const [isLoading, setLoading] = useState(false);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
 
    const labels = requestStats?.days.map(day => new Date(day).toLocaleString('ru-RU', { dateStyle: 'short' }));
    defaults.font.size = 22;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            title: {
                display: true,
                text: 'Заявки за последние 90 дней'
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: StatChartHeader.SUCCESS,
                data: requestStats?.successPercentage,
                borderColor: 'rgb(29, 67, 128)',
                backgroundColor: 'rgb(29, 67, 128)'
            },
            {
                label: StatChartHeader.AT_WORK,
                data: requestStats?.atWorkPercentage,
                borderColor: 'rgb(113, 185, 244)',
                backgroundColor: 'rgb(113, 185, 244)'
            },
            {
                label: StatChartHeader.FAILED,
                data: requestStats?.failedPercentage,
                borderColor: 'rgb(222, 64, 69)',
                backgroundColor: 'rgb(222, 64, 69)'
            }
        ]
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${baseServerPath}/stats`, { headers: { Authorization: token || ''} })
        .then(res => res.json())
        .then(data => {
            dispatch(setStatsStatsSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setStatsError(String(err)));
            setLoading(false);
        });
    }, []);

    if (isLoading) return <Loader error={ false } message={ 'Подгрузка данных...' } />;
    if (error) return <Loader error={ true } message={ `${StatsMessage.FetchDataProblems}: ${error}` } />;

    return (
        <>
            <ManagerLayout>
                <div id={ statsCSSVariables.mainContentId }>
                    <div id={ statsCSSVariables.dataListId }>
                        <div className={ statsCSSVariables.dataClass }>
                            <p className={ statsCSSVariables.dataHeaderClass }>{ StatListHeader.ALL }</p>
                            <p>{ requestStats?.all }</p>
                        </div>
                        <div className={ statsCSSVariables.dataClass }>
                            <p className={ statsCSSVariables.dataHeaderClass }>{ StatListHeader.SUCCESS }</p>
                            <p>{ `${requestStats?.success.all} (${requestStats?.success.percentage}%)` }</p>
                        </div>
                        <div className={ statsCSSVariables.dataClass }>
                            <p className={ statsCSSVariables.dataHeaderClass }>{ StatListHeader.AT_WORK }</p>
                            <p>{ `${requestStats?.atWork.all} (${requestStats?.atWork.percentage}%)` }</p>
                        </div>
                        <div className={ statsCSSVariables.dataClass }>
                            <p className={ statsCSSVariables.dataHeaderClass }>{ StatListHeader.FAILED }</p>
                            <p>{ `${requestStats?.failed.all} (${requestStats?.failed.percentage}%)` }</p>
                        </div>
                        <div className={ statsCSSVariables.dataClass }>
                            <p className={ statsCSSVariables.dataHeaderClass }>{ StatListHeader.AVERAGE_EXEC_TIME }</p>
                            <p>{ requestStats?.averageTime }</p>
                        </div>
                    </div>
                    <div id={ statsCSSVariables.chartId }>
                        <Line options={ options } data={ data } />
                    </div>
                </div>
            </ManagerLayout>
        </>
    );
};

export default Stats;