import React, { useState } from 'react';
import ProjectStatusBlogDonutChart from './ProjectStatusBlogDonutChart';
import DoughnutChartComponent from '../../charts/Chartjs/DoughnutChartComponent';

const ProjectStatusBlog = ({ title, strediskaGraf, strediskoCounts }) => {
    const [strediskaGrafArr, setStrediskaGrafArr] = useState([]);

   
    // Filter out duplicates by checking if the current index is the first occurrence of the stredisko name
    const uniqueStrediskaGraf = strediskaGraf.filter((stredisko, index, self) =>
        index === self.findIndex((t) => (
            t.name === stredisko.name 
        ))
    );

    return (
        <>
            <div className="card">
                <div className="card-header pb-0 border-0">
                    <h4 className="heading mb-0">{title}</h4>
                </div>
                <div className="card-body" style={{ borderRadius:"10px" }}>
                    <h5 class="h6_strediska">Workplaces</h5>
                    {/* <ProjectStatusBlogDonutChart
                        strediskaGraf={strediskaGraf}
                        strediskoCounts={strediskoCounts}
                    /> */}
                   <div className="chartBoxDoughnut">
                   <DoughnutChartComponent
                        strediskaGraf={strediskaGraf}
                        strediskoCounts={strediskoCounts}
                    />
                   </div>
                    <div className="project-date">
                        {uniqueStrediskaGraf.map((stredisko, index) => (
                            <div className="project-media" key={index}>
                                {console.log(strediskoCounts[stredisko.name])}
                                {strediskoCounts[stredisko.name] ? <p><span style={{ fontSize: '13px' }}>{stredisko.name}</span> - {strediskoCounts[stredisko.name] || 0 } lidi</p> : ""}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectStatusBlog;
