import { Filters } from '@yext/answers-react-components';

export function StaticFilters() {
  return (
    <Filters.StaticFilters className='md:w-56' searchOnChange={true}>
      <Filters.FilterGroup fieldId='services'>
        <Filters.CollapsibleLabel label='Services'/>
        <Filters.CollapsibleSection>
          <Filters.SearchInput />
          <Filters.CheckboxOption value='Drip Refills'/>
          <Filters.CheckboxOption value='Free Wifi'/>
        </Filters.CollapsibleSection>
      </Filters.FilterGroup>
    </Filters.StaticFilters>
  )
}