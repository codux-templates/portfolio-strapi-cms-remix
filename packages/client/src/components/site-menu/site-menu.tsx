import styles from './site-menu.module.scss';
import * as RadixMenu from '@radix-ui/react-navigation-menu';
import { ROUTES } from '../../router/config';
import { offset, useFloating } from '@floating-ui/react-dom';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { shift } from '@floating-ui/core';
import cx from 'classnames';
import { Link, useMatch, useNavigation, useRouteLoaderData } from '@remix-run/react';
import { loader } from '~/app/root';

export interface SiteMenuProps {
  className?: string;
  isOpen?: true;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const SiteMenu = ({ className, isOpen }: SiteMenuProps) => {
  const rootData = useRouteLoaderData<typeof loader>('root');
  const projects = rootData?.projects;
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  return (
    <RadixMenu.Root className={cx(styles.root, className)}>
      <RadixMenu.List className={styles.topMenu}>
        <RadixMenu.Item>
          <MenuLink to={ROUTES.projects.to()} text="Home" />
        </RadixMenu.Item>
        <RadixMenu.Item>
          <MenuLink to={ROUTES.about.to()} text="About" />
        </RadixMenu.Item>
        <RadixMenu.Item>
          <FloatingContentWithTrigger text="Projects" isOpen={isOpen}>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <RadixMenu.List className={styles.sub}>
                {projects?.map((project) => (
                  <RadixMenu.Item key={project.id}>
                    <MenuLink to={ROUTES.project.to(project.id)} text={project.attributes.title} />
                  </RadixMenu.Item>
                ))}
              </RadixMenu.List>
            )}
          </FloatingContentWithTrigger>
        </RadixMenu.Item>
        <RadixMenu.Item>
          <a href="#footer" className={styles.Link}>
            Contact
          </a>
        </RadixMenu.Item>
      </RadixMenu.List>
    </RadixMenu.Root>
  );
};

function MenuLink(props: { text: string; to: string }) {
  const match = useMatch(props.to);
  const isActive = !!match;

  return (
    <RadixMenu.Link active={isActive} asChild>
      <Link to={props.to} className={cx(styles.Link, { [styles.active]: isActive })}>
        <span>{props.text}</span>
      </Link>
    </RadixMenu.Link>
  );
}

/**
 * This component allows for the sub menus to render as floating elements (without affecting the DOM around it).
 *
 * Also we are portalling the content of the menu to the body. which will append it as the last child of the body
 * hence avoiding the z-index issue.
 * If you have more complex floating elements in your project I advise installing `@floating-ui/react`
 * (not just `@floating-ui/react-dom`) and using [`FloatingPortal`](https://floating-ui.com/docs/FloatingPortal)
 *
 * @param props
 * @property children - the content of the sub menu, normally `RadixMenu.List`
 * @property text - the text on the trigger button
 * @returns the sub menu wrapped with a trigger button and floating css
 */
function FloatingContentWithTrigger(props: { children: ReactNode; text: string; isOpen?: true }) {
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(10), shift()],
    open: props.isOpen,
  });

  return (
    <>
      <RadixMenu.Trigger ref={refs.setReference} className={styles.Link}>
        {props.text}
      </RadixMenu.Trigger>
      {typeof window !== 'undefined' &&
        typeof window.document !== 'undefined' &&
        createPortal(
          <RadixMenu.Content
            forceMount={props.isOpen}
            ref={refs.setFloating}
            style={{ ...floatingStyles }}
            className={styles.content}
          >
            {props.children}
          </RadixMenu.Content>,
          document.body,
        )}
    </>
  );
}
