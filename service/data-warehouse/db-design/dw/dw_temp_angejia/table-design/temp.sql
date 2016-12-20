select
  current_page,
  regexp_extract(current_page,'^/(sale/sh/|)([0-9]+)\.html$',2) AS inventory_id
from
  dw_web_visit_traffic_log
where
  p_dt='2015-06-15'
and
  current_page_id in ('20008','10035');
