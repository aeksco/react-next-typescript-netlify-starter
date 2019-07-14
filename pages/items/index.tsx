import * as React from "react";
import Link from "next/link";
import { Breadcrumb, Button, Grid, Icon, List } from "semantic-ui-react";

type Item = {
  id: number,
  label: string,
  done: boolean,
}

const initialItems: Item[] = [
  { id: 1, label: 'Vue.js', done: false },
  { id: 2, label: 'React.js', done: false },
]
const TodoList = () => {
  return (
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={16}>
          <h1>Items</h1>

          <Breadcrumb>
            <Breadcrumb.Section link>
              <Link href="/">
                <a>Home</a>
              </Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Items</Breadcrumb.Section>
          </Breadcrumb>

          <List divided verticalAlign="middle">
            {initialItems.map((item: Item) => (
              <List.Item key={item.id}>
                <List.Content>{item.label}</List.Content>
                <List.Content floated="right">
                  <Link href="/items/[id]" as={`/items/${item.id}`}>
                    <a>
                      <Button size="tiny">
                        <Icon name="eye" />
                        Show
                      </Button>
                    </a>
                  </Link>

                  <Link href="/items/[id]/edit" as={`/items/${item.id}/edit`}>
                    <a>
                      <Button size="tiny">
                        <Icon name="edit" />
                        Edit
                      </Button>
                    </a>
                  </Link>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TodoList;
