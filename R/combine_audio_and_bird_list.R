library(tidyverse)
library(fuzzyjoin)

read_csv("AOUlist.csv", skip=1)%>%
  select(`Scientific Name`, `Common Name`, Order, Family)%>%
  filter(str_detect(`Scientific Name`, "Aphelocoma"))

read_csv("TRFO_bird_list.csv")%>%
  select(-`General Grouping`)%>%
  left_join(
    read_csv("AOUlist.csv", skip=1)%>%
      select(`Scientific Name`, `Common Name`, Order, Family), 
    by = "Common Name"
  )%>%
  filter(is.na(`Scientific Name`))

read_csv("data/NACC_list_species.csv")%>%
  filter(str_detect(common_name, "Sage"))

bird_list<-read_csv("data/TRFO_bird_list.csv")%>%
  select(-`General Grouping`)%>%
  left_join(
    read_csv("data/NACC_list_species.csv"), 
    by = c("Common Name" = "common_name")
  )%>%
  select(-french_name, -subfamily)%>%
  select(`Common Name`, order:species)%>%
  rename(common_name = `Common Name`)

list.files("bird_songs_of_the_rockies")%>%
  bind_cols(list.files, "bird_songs_of_the_rockies", full.names = T)

files<-tibble(
  file_name = list.files("bird_songs_of_the_rockies"), 
  audio_file_path = list.files("bird_songs_of_the_rockies", full.names = T)
)%>%
  mutate(file_name = gsub("[^-A-Za-z' ]","", tools::file_path_sans_ext(file_name)))%>%
  mutate(file_name = str_trim(file_name))%>%
  rowwise()%>%
  mutate(file_name = ifelse(str_detect(file_name, " - "), 
                                paste(strsplit(file_name, " - ")[[1]][2], strsplit(file_name, " - ")[[1]][1], sep = " "), 
                                file_name)
         )%>%
  mutate(file_name =case_when(
    file_name == "Black-Billed Magpie" ~ "Black-billed Magpie",
    file_name == "Black-Capped Chickadee" ~ "Black-capped Chickadee",
    file_name == "Common Night Hawk" ~ "Common Nighthawk",
    file_name == "Downey Woodpecker" ~ "Downy Woodpecker",
    file_name == "Green-Tailed Towhee" ~ "Green-tailed Towhee",
    file_name == "Sage Sparrow" ~ "Sagebrush Sparrow",
    file_name == "Western Scrub Jay" ~ "Woodhouse's Scrub-Jay",
    file_name == "White-Throated Swift" ~ "White-throated Swift",
    TRUE ~ file_name
  ))

files%>%
  filter(str_detect(file_name, "Swift"))

files%>%View()

bird_list%>%
  left_join(files, by = c("common_name" = "file_name"))%>%
  write_csv("cleaned_list_with_filenames.csv")
