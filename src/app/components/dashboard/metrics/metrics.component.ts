import { Component, OnInit, ViewChild } from '@angular/core';
import { MetricService } from '../../../services/metrics.service';
import { Metrics } from '../../../models/metrics/metrics.model';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

@Component({
  selector: 'app-metrics-dashboard',
  templateUrl: './metrics.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgChartsModule,
    MatProgressSpinnerModule
  ],
  styleUrls: ['./metrics.component.css']
})
export class MetricsDashboardComponent implements OnInit {

  metrics: Metrics | null = null;
  loading: boolean = true;
  error: string | null = null;

  // For Table Data
  displayedColumns: string[] = ['metric', 'value'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  // Chart Data
  lineChartData: ChartData<'line'> = {
    labels: ['Products', 'Categories', 'Users'], // The x-axis labels for the chart
    datasets: [
      {
        data: [], // Data will be dynamically loaded here
        label: 'Counts',
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.1
      }
    ]
  };

  lineChartOptions: ChartOptions = {
    responsive: true, // Disable responsiveness to control dimensions manually
  maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Metrics'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Counts'
        }
      }
    }
  };

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private metricService: MetricService) { }

  ngOnInit(): void {
    this.loadMetrics();
  }

  loadMetrics(): void {
    this.metricService.getMetrics().subscribe(
      (metrics: Metrics) => {
        this.metrics = metrics;
        this.loading = false;

        // Update the table data with the fetched metrics
        this.dataSource = new MatTableDataSource([
          { metric: 'Total Products', value: metrics.totalProducts },
          { metric: 'Total Categories', value: metrics.totalCategories },
          { metric: 'Total Users', value: metrics.totalUsers }
        ]);
        
        // Update the chart data with the fetched metrics
        this.lineChartData.datasets[0].data = [
          metrics.totalProducts,
          metrics.totalCategories,
          metrics.totalUsers
        ];

        // Apply pagination and sorting to the table
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      (error) => {
        this.error = 'Error fetching metrics.';
        this.loading = false;
        console.error('Error fetching metrics:', error);
      }
    );
  }
}
