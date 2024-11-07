import { FunctionComponent } from 'react';
import { ColumnPage, FormPage } from '@/components/layout';
import { WithComponent } from '@/components/layout/WithComponent';

/**
 * Renders a page with a column layout, consisting of a main component and optional menu and footer components.
 *
 * @param {FunctionComponent | JSX.Element} Component - The main component to render within the page.
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl'} [width] - The optional width of the page layout.
 * @param {FunctionComponent | JSX.Element} [MenuComponent] - The optional menu that will replace provided Menu component.
 * @param {FunctionComponent | JSX.Element} [FooterComponent] - The optional footer that will replace provided Footer component.
 *
 * @returns {JSX.Element} The rendered column page.
 */
export function withColumnPage(
  Component: FunctionComponent | JSX.Element,
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element
): JSX.Element {
  return (
    <ColumnPage MenuComponent={MenuComponent} FooterComponent={FooterComponent} width={width}>
      <WithComponent Component={Component} />
    </ColumnPage>
  );
}

/**
 * Renders a page with a form by wrapping the component in a FormPage component.
 *
 * @param {FunctionComponent | JSX.Element} Component - The component to be wrapped with FormPage.
 * @param {FunctionComponent | JSX.Element} [MenuComponent] - The optional menu that will replace provided Menu component.
 * @param {FunctionComponent | JSX.Element} [FooterComponent] - The optional footer that will replace provided Footer component.
 * @returns {JSX.Element} - The resulting page with the provided components wrapped in FormPage.
 */
export function withFormPage(
  Component: FunctionComponent | JSX.Element,
  MenuComponent?: FunctionComponent | JSX.Element,
  FooterComponent?: FunctionComponent | JSX.Element
): JSX.Element {
  return (
    <FormPage MenuComponent={MenuComponent} FooterComponent={FooterComponent}>
      <WithComponent Component={Component} />
    </FormPage>
  );
}
