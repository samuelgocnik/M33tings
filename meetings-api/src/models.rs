use chrono::serde::ts_milliseconds;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Event {
    pub id: i32,
    pub creator_id: i32,
    pub name: String,
    #[serde(with = "ts_milliseconds")]
    pub created_at: DateTime<Utc>,
}
