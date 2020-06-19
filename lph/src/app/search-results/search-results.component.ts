import {Component, OnInit} from "@angular/core";
import {SearchService} from "../shared/search.service";
import {UserService} from "../shared/user.service";
import {SearchResult} from "../shared/model";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  numberOfResults: number;
  searchValue: string;
  listResults;

  constructor(private searchService: SearchService, private userService: UserService) {}

  ngOnInit() {
    this.numberOfResults = 0;
    this.searchValue = "";
    this.listResults = [];

    this.searchService.getValueToSearch().subscribe((val) => {
      let rr = [];
      this.searchValue = val;
      if (this.searchValue != null && this.searchValue.length != 0) {
        this.searchService.fetchResults(this.searchValue).then((r) => {
          let keys = Object.keys(r.val());
          keys.forEach((key) => {
            if (key != this.userService.getUserId()) {
              let sr: SearchResult = {
                id: key,
                name: r.val()[key].fullName,
                photo: r.val()[key].profilePhoto
              };
              rr.push(sr);
            }
          });
          this.listResults = rr;
          console.log("rr", this.listResults);
        });
      }
    });
  }
}
