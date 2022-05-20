# Retool

## Structure

- Account
	- Apps
		- Resources (queries and API requests)
		- Components (UI elements)

## Components and properties

	{{ current_user.firstName || 'friend' }}

- current_user.firstName
- searchBar.value
- table1.selectedRow.data.id

## Data tables

### Update data row

https://docs.retool.com/docs/working-with-tables#editing-table-values-making-data-editable

- New Query (GUI mode, Bulk update/upsert)
- `{{ product_table.recordUpdates }}`
- Table component: Interactions: Save 

### Create new row

- Create new Query (GUI mode, Insert a record)
- Table component:
	- Toggle “Show add row button”
	- Interactions: Save new

### Delete row

- Create new Query (GUI mode, Delete a record)
	- Use magic variable `i` after field name: `{{ product_table.data.id[i] }}`
	- Advanced: Confirmation Modal
- Table: Add new column: Action Button type

## Menu

- If you want to contain multiple screens within an app, you can use a tabbed container.
- You could also try a container with a bunch of buttons that show and hide containers in the app.

https://community.retool.com/t/add-a-side-navigation-bar-with-collapsible-multi-level-menu-items/2405
