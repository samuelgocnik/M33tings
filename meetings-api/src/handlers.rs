use crate::lib::error::Error;
use crate::models::Event;
use crate::repo::event_repo::{EventRepo, PostgresEventRepo};

use actix_web::web;
use std::sync::Arc;

pub async fn events(
    data: web::Data<Arc<PostgresEventRepo>>,
) -> Result<web::Json<Vec<Event>>, Error> {

    println!("get all events");
    let events = data.list_events().await.unwrap_or_default();

    Ok(web::Json(events))
}
