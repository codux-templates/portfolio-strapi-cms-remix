import { Navigate, RouteObject } from 'react-router-dom';
import { SiteWrapper } from '../components/site-wrapper/site-wrapper';
import { HomePage } from '../pages/home-page/home-page';
import { AboutPage } from '../pages/about-page/about-page';
import { ROUTES } from './config';
import { ProjectPage } from '../pages/project-page/project-page';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <SiteWrapper />,
    children: [
      { index: true, element: <Navigate to={ROUTES.projects.to()} /> },
      { path: ROUTES.projects.path, index: true, element: <HomePage /> },
      { path: ROUTES.project.path, element: <ProjectPage /> },
      { path: ROUTES.about.path, element: <AboutPage /> },
    ],
  },
];
