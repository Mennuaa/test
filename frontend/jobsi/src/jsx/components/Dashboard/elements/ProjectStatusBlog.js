import React from 'react';
import ProjectStatusBlogDonutChart from './ProjectStatusBlogDonutChart';
import DoughnutChartComponent from '../../charts/Chartjs/DoughnutChartComponent';

const ProjectStatusBlog = ({ title, strediskaGraf, strediskoCounts }) => {


    return (
        <>
            <div className="card">
                <div className="card-header pb-0 border-0">
                    <h4 className="heading mb-0">{title}</h4>

                </div>
                <div className="card-body">
                    <h5 class="h6_strediska">Workplaces</h5>
                    {/* <ProjectStatusBlogDonutChart
                        strediskaGraf={strediskaGraf}
                        strediskoCounts={strediskoCounts}
                    /> */}
                    <DoughnutChartComponent
                        strediskaGraf={strediskaGraf}
                        strediskoCounts={strediskoCounts}
                    />
                    <div className="project-date">

    
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectStatusBlog;