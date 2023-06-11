@extends('top.app')
@include('top.topnav_general')
@section('content')
 <!-- ======= Our Team Section ======= -->
 <section id="team" class="team">
    <div class="container" data-aos="fade-up">

        <div class="section-header">
            <h2>Our Team</h2>
            <p>The team who made it all possible..</p>
        </div>

        <div class="row gy-4">

            <div class="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
                <div class="member">
                    <img src="{{ asset('img/general/cnerd.jpg') }}" class="img-fluid" alt="">
                    <h4>Top</h4>
                    <span>SUb</span>
                    <div class="memberx">
                        <a href="https://www.facebook.com/cnerdmahadi"><p>Cnerd Mahadi</p></a>
                        <a href="https://www.facebook.com/cnerdmahadi"><p>Cnerd Mahadi</p></a>
                        <a href="https://www.facebook.com/cnerdmahadi"><p>Cnerd Mahadi</p></a>
                        <a href="https://www.facebook.com/cnerdmahadi"><p>Cnerd Mahadi</p></a>
                        <a href="" class="btn btn-success">Dispacth</a>
                    </div>
                </div>
            </div><!-- End Team Member -->

        </div>

    </div>
</section><!-- End Our Team Section -->

@stop
