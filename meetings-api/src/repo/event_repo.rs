use async_trait::async_trait;
use sqlx::PgPool;
use std::sync::Arc;

use crate::models::Event;

#[async_trait]
pub trait EventRepo {
    async fn list_events(&self) -> anyhow::Result<Vec<Event>>;
}

pub struct PostgresEventRepo {
    pub pg_pool: Arc<PgPool>,
}

impl PostgresEventRepo {
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }
}

#[async_trait]
impl EventRepo for PostgresEventRepo {
    async fn list_events(&self) -> anyhow::Result<Vec<Event>> {
        let events = sqlx::query_as!(Event, "SELECT * FROM event")
            .fetch_all(&*self.pg_pool)
            .await?;

        Ok(events)
    }
}
